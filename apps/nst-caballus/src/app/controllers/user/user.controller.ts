import { Controller, Post, Body, Get, Param, Delete, Put, Headers, NotAcceptableException, BadRequestException } from '@nestjs/common';
import { AuthService, UserService } from '@nst-caballus/dal';
import { LoggedInUser, Secured, Anonymous, WildCardPermission } from '@rfx/nst-permissions';
import { ApiBadRequestResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User, Permission } from '@caballus/api-common';
import { PaginatedListModel } from '@rfx/common';
import { GridParamsDto } from '@rfx/nst-common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserEditDto } from './dto/user-edit.dto';
import { UserParamsDto } from './dto/user-params.dto';
import { ObjectId, IdDto, parseObjectId } from '@rfx/nst-db/mongo';
import { UserRegistrationDto } from './dto/user-registration-dto';
import { MongoError } from 'mongodb';
import { IdListDto } from '../id-list.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly _userService: UserService,
        private readonly _authService: AuthService
    ) {}

    @Get('')
    @ApiOperation({ title: 'Get Logged In User' })
    @Secured(WildCardPermission)
    public async getLoggedInUser(@LoggedInUser() user: User): Promise<User> {
        return user;
    }

    @Delete('')
    @Secured(Permission.UserDelete)
    public async deleteRoles(
        @Body() idListDto: IdListDto
    ): Promise<void> {
        return this._userService.deleteUsersByIdList(idListDto.ids);
    }

    @Get('permissions')
    @ApiOperation({ title: 'Get Logged In User Permissions' })
    @ApiOkResponse({ description: 'User Permissions', type: [String] })
    @Secured(WildCardPermission)
    public async getLoggedInUserPermissions(@LoggedInUser() user: User): Promise<string[]> {
        return user.permissions;
    }

    @Post('list')
    @ApiOperation({
        title: 'User List'
    })
    @Secured(Permission.UserView)
    public async listUsers(
        @Body() dto: UserParamsDto
    ): Promise<PaginatedListModel<User>> {
        return this._userService.getGridUsers(dto.toUserGridParams());
    }

    @Post('create')
    @ApiOperation({ title: 'Create User' })
    @Secured(Permission.UserCreate)
    public async createUser(
        @Body() dto: UserCreateDto
    ): Promise<ObjectId> {
        return this._userService.createUser(dto);
    }

    @Put('seenWelcomeModal')
    @ApiOperation({ title: 'Mark that the user has seen the welcome modal' })
    @Secured(WildCardPermission)
    public seenWelcomeModal(@LoggedInUser() user: User): Promise<void> {
        return this._userService.seenWelcomeModal(user);
    }

    @Post('register')
    @ApiOperation({ title: 'Registration' })
    @Anonymous()
    public async registerUser(@Body() dto: UserRegistrationDto): Promise<void> {
        try {
            await this._userService.registerUser(dto);
        } catch (e) {
            if (e instanceof MongoError) {
                // tslint:disable:no-magic-numbers
                switch (e.code) {
                    case 11000: // Duplicate key
                        throw new Error('Email already taken');
                    default:
                        break;
                }
                // tslint:enable:no-magic-numbers
            }

            throw new Error('Could not create user');
        }
    }

    @Get(':id')
    @ApiOperation({ title: 'Get User By Id' })
    @Secured(Permission.UserView)
    public async getRole(@Param() idDto: IdDto): Promise<User> {
        return this._userService.getUserById(idDto.id);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit User' })
    @Secured(Permission.UserEdit)
    public async editUser(
        @Param() idDto: IdDto,
        @Body() dto: UserEditDto
    ): Promise<void> {
        return this._userService.editUser(idDto.id, dto);
    }

    @Get('impersonate/start/:id')
    @ApiOperation({ title: 'Imperonsate selected user' })
    @ApiOkResponse({ description: 'New JWT token' })
    @ApiNotAcceptableResponse({
        description: 'already impersonating or trying to self impersonate'
    })
    @Secured(Permission.UserImpersonate)
    public async impersonateStart(
        @Headers('authorization') authHeader: string,
        @Param() idDto: IdDto,
        @LoggedInUser() loggedInUser: User,
    ): Promise<{ token: string; refresh: string }> {
        const payload = await this._authService.getJwtPayloadFromHeader(authHeader);
        if (payload.absoluteUserId !== payload.userId) {
            throw new NotAcceptableException('Already impersonating');
        }
        if (loggedInUser._id.equals(idDto.id)) {
            throw new NotAcceptableException('Cannot impersonate self');
        }
        const targetUser = await this._userService.getUserById(idDto.id);
        if (!targetUser) {
            throw new BadRequestException('Invalid user selection');
        }
        return await this._authService.createImpersonationTokens(
            loggedInUser,
            targetUser
        );
    }

    @Get('impersonate/stop')
    @ApiOperation({ title: 'Stop impersonation and resume original user identity' })
    @ApiOkResponse({ description: 'New JWT token' })
    @ApiBadRequestResponse({ description: 'if the user is not impersonating' })
    @Secured(WildCardPermission)
    public async impersonateStop(
        @Headers('authorization') authHeader: string,
        @LoggedInUser() loggedInUser: User
    ): Promise<{ token: string; refresh: string }> {
        const payload = await this._authService.getJwtPayloadFromHeader(authHeader);
        let absoluteUserId: ObjectId = null;
        try {
            absoluteUserId = parseObjectId(payload.absoluteUserId);
        } catch (e) {
            // valid impersonation must provide absolute user id
            throw new BadRequestException('not impersonating');
        }
        if (absoluteUserId.equals(loggedInUser._id)) {
            // not impersonating
            throw new BadRequestException('not impersonating');
        }
        const absoluteUser = await this._userService.getUserById(absoluteUserId);
        if (!absoluteUser) {
            // if absolute user doesn't exist send empty token to force logout
            return { token: null, refresh: null };
        }
        return await this._authService.impersonationStopTokens(absoluteUser);
    }
}
