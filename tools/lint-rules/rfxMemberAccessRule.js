'use strict';
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function(d, b) {
                    d.__proto__ = b;
                }) ||
            function(d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __makeTemplateObject =
    (this && this.__makeTemplateObject) ||
    function(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, 'raw', { value: raw });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
exports.__esModule = true;
var tsutils_1 = require('tsutils');
var ts = require('typescript');
var Lint = require('tslint');
var OPTION_NO_PUBLIC = 'no-public';
var OPTION_CHECK_ACCESSOR = 'check-accessor';
var OPTION_CHECK_CONSTRUCTOR = 'check-constructor';
var OPTION_CHECK_PARAMETER_PROPERTY = 'check-parameter-property';
var OPTION_IGNORE_ANGULAR_LIFECYCLE = 'ignore-angular-lifecycle';
var Rule = /** @class */ (function(_super) {
    __extends(Rule, _super);
    function Rule() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Rule.FAILURE_STRING_FACTORY = function(memberType, memberName) {
        memberName = memberName === undefined ? '' : " '" + memberName + "'";
        return (
            'The ' +
            memberType +
            memberName +
            " must be marked either 'private', 'public', or 'protected'"
        );
    };
    Rule.prototype.apply = function(sourceFile) {
        var options = this.ruleArguments;
        var noPublic = options.indexOf(OPTION_NO_PUBLIC) !== -1;
        var checkAccessor = options.indexOf(OPTION_CHECK_ACCESSOR) !== -1;
        var checkConstructor = options.indexOf(OPTION_CHECK_CONSTRUCTOR) !== -1;
        var checkParameterProperty = options.indexOf(OPTION_CHECK_PARAMETER_PROPERTY) !== -1;
        var ignoreAngularLifecycleProperty =
            options.indexOf(OPTION_IGNORE_ANGULAR_LIFECYCLE) !== -1;
        if (noPublic) {
            if (checkAccessor || checkConstructor || checkParameterProperty) {
                return [];
            }
            checkAccessor = checkConstructor = checkParameterProperty = true;
        }
        return this.applyWithFunction(sourceFile, walk, {
            checkAccessor: checkAccessor,
            checkConstructor: checkConstructor,
            checkParameterProperty: checkParameterProperty,
            noPublic: noPublic,
            ignoreAngularLifecycleProperty: ignoreAngularLifecycleProperty
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: 'member-access',
        description: 'Requires explicit visibility declarations for class members.',
        rationale: Lint.Utils.dedent(
            templateObject_1 ||
                (templateObject_1 = __makeTemplateObject(
                    [
                        "\n            Explicit visibility declarations can make code more readable and accessible for those new to TS.\n            Other languages such as C# default to `private`, unlike TypeScript's default of `public`.\n            Members lacking a visibility declaration may be an indication of an accidental leak of class internals.\n        "
                    ],
                    [
                        "\n            Explicit visibility declarations can make code more readable and accessible for those new to TS.\n            Other languages such as C# default to \\`private\\`, unlike TypeScript's default of \\`public\\`.\n            Members lacking a visibility declaration may be an indication of an accidental leak of class internals.\n        "
                    ]
                ))
        ),
        optionsDescription: Lint.Utils.dedent(
            templateObject_2 ||
                (templateObject_2 = __makeTemplateObject(
                    [
                        '\n            These arguments may be optionally provided:\n            * `"no-public"` forbids public accessibility to be specified, because this is the default.\n            * `"check-accessor"` enforces explicit visibility on get/set accessors\n            * `"check-constructor"`  enforces explicit visibility on constructors\n            * `"check-parameter-property"`  enforces explicit visibility on parameter properties\n            * `"ignore-angular-lifecycle"`  ignores the angular lifecycle hooks when requiring member access'
                    ],
                    [
                        '\n            These arguments may be optionally provided:\n            * \\`"no-public"\\` forbids public accessibility to be specified, because this is the default.\n            * \\`"check-accessor"\\` enforces explicit visibility on get/set accessors\n            * \\`"check-constructor"\\`  enforces explicit visibility on constructors\n            * \\`"check-parameter-property"\\`  enforces explicit visibility on parameter properties\n            * \\`"ignore-angular-lifecycle"\\`  ignores the angular lifecycle hooks when requiring member access'
                    ]
                ))
        ),
        options: {
            type: 'array',
            items: {
                type: 'string',
                enum: [
                    OPTION_NO_PUBLIC,
                    OPTION_CHECK_ACCESSOR,
                    OPTION_CHECK_CONSTRUCTOR,
                    OPTION_CHECK_PARAMETER_PROPERTY,
                    OPTION_IGNORE_ANGULAR_LIFECYCLE
                ]
            },
            minLength: 0,
            maxLength: 5
        },
        optionExamples: [true, [true, OPTION_NO_PUBLIC], [true, OPTION_CHECK_ACCESSOR]],
        type: 'typescript',
        typescriptOnly: true,
        hasFix: true
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_NO_PUBLIC = "'public' is implicit.";
    return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
function walk(ctx) {
    var _a = ctx.options,
        noPublic = _a.noPublic,
        checkAccessor = _a.checkAccessor,
        checkConstructor = _a.checkConstructor,
        checkParameterProperty = _a.checkParameterProperty,
        ignoreAngularLifecycleProperty = _a.ignoreAngularLifecycleProperty;
    var angularLifecycleProperties = [
        'ngOnChanges',
        'ngOnInit',
        'ngDoCheck',
        'ngAfterContentInit',
        'ngAfterContentChecked',
        'ngAfterViewInit',
        'ngAfterViewChecked',
        'ngOnDestroy'
    ];
    return ts.forEachChild(ctx.sourceFile, function recur(node) {
        if (tsutils_1.isClassLikeDeclaration(node)) {
            for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
                var child = _a[_i];
                if (shouldCheck(child)) {
                    check(child);
                }
                if (
                    checkParameterProperty &&
                    tsutils_1.isConstructorDeclaration(child) &&
                    child.body !== undefined
                ) {
                    for (var _b = 0, _c = child.parameters; _b < _c.length; _b++) {
                        var param = _c[_b];
                        if (tsutils_1.isParameterProperty(param)) {
                            check(param);
                        }
                    }
                }
            }
        }
        return ts.forEachChild(node, recur);
    });
    function shouldCheck(node) {
        switch (node.kind) {
            case ts.SyntaxKind.Constructor:
                return checkConstructor;
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return checkAccessor;
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
                return true;
            default:
                return false;
        }
    }
    function check(node) {
        if (
            tsutils_1.hasModifier(
                node.modifiers,
                ts.SyntaxKind.ProtectedKeyword,
                ts.SyntaxKind.PrivateKeyword
            )
        ) {
            return;
        }
        var publicKeyword = tsutils_1.getModifier(node, ts.SyntaxKind.PublicKeyword);
        if (noPublic && publicKeyword !== undefined) {
            // public is not optional for parameter property without the readonly modifier
            if (
                node.kind !== ts.SyntaxKind.Parameter ||
                tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword)
            ) {
                var start = publicKeyword.end - 'public'.length;
                ctx.addFailure(
                    start,
                    publicKeyword.end,
                    Rule.FAILURE_STRING_NO_PUBLIC,
                    Lint.Replacement.deleteFromTo(
                        start,
                        tsutils_1
                            .getNextToken(publicKeyword, ctx.sourceFile)
                            .getStart(ctx.sourceFile)
                    )
                );
            }
        }
        if (!noPublic && publicKeyword === undefined) {
            var nameNode =
                node.kind === ts.SyntaxKind.Constructor
                    ? tsutils_1.getChildOfKind(
                          node,
                          ts.SyntaxKind.ConstructorKeyword,
                          ctx.sourceFile
                      )
                    : node.name !== undefined
                    ? node.name
                    : node;
            var memberName =
                node.name !== undefined && node.name.kind === ts.SyntaxKind.Identifier
                    ? node.name.text
                    : undefined;
            if (
                ignoreAngularLifecycleProperty &&
                angularLifecycleProperties.indexOf(memberName) > -1
            ) {
                // Ignore error
            } else {
                ctx.addFailureAtNode(
                    nameNode,
                    Rule.FAILURE_STRING_FACTORY(typeToString(node), memberName),
                    Lint.Replacement.appendText(
                        getInsertionPosition(node, ctx.sourceFile),
                        'public '
                    )
                );
            }
        }
    }
}
function getInsertionPosition(member, sourceFile) {
    var node =
        member.decorators === undefined
            ? member
            : tsutils_1.getTokenAtPosition(member, member.decorators.end, sourceFile);
    return node.getStart(sourceFile);
}
function typeToString(node) {
    switch (node.kind) {
        case ts.SyntaxKind.MethodDeclaration:
            return 'class method';
        case ts.SyntaxKind.PropertyDeclaration:
            return 'class property';
        case ts.SyntaxKind.Constructor:
            return 'class constructor';
        case ts.SyntaxKind.GetAccessor:
            return 'get property accessor';
        case ts.SyntaxKind.SetAccessor:
            return 'set property accessor';
        case ts.SyntaxKind.Parameter:
            return 'parameter property';
        default:
            throw new Error('unhandled node type ' + ts.SyntaxKind[node.kind]);
    }
}
var templateObject_1, templateObject_2;
