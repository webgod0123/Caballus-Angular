/** MongoDB Script
 *  requires mongo shell 4.2
 *
 * This script will create the basic collections and default user for a new project.
 * This script also expects the intended new db to not exist.
 *
 * Modify the $projectSlug, environment and company name as needed.
 *
 * You can run the script from the command line and be prompted for the password. You will need to login using a user account that has the ability to write to the database.
 * mongo "mongodb+srv://dev1-uwz72.gcp.mongodb.net"  --username [user] --password [password] init-db.js
 */
const environments = {
    DEV: 'dev',
    QA: 'qa',
    UAT: 'uat',
    PROD: 'production'
};
const $environment = environments.DEV;
const $projectSlug = 'decaf'; // try to keep this short and unique
const newDatabase = $projectSlug + '-' + $environment;
const tempCollectionName = 'temp';
const newCompanyName = 'Riafox';
const newCompanyId = ObjectId();
const roleId = ObjectId();
const newDocs = [];
print(
    'Enter a secure password for the database user. This password will be needed in the environment files for the app.'
);

print('Preparing database ' + newDatabase + ' for company ' + newCompanyName);
if (
    db
        .getMongo()
        .getDBNames()
        .indexOf(newDatabase) !== -1
) {
    print('database exists');
    throw new Error('Database ' + newDatabase + 'already exists. Terminating program.');
} else {
    print('database does not exist yet');
}

newDocs['company'] = {
    _id: newCompanyId,
    status: 1,
    profile: {
        name: newCompanyName,
        phone: '2087942561',
        address: {
            line1: '13960 W Wainwright Dr',
            line2: '',
            city: 'Boise',
            state: 'ID',
            postalCode: '83713'
        },
        email: 'info@seedmc.com',
        logo: null,
        _id: null,
        fax: null
    },
    tags: [],
    settings: {}
};

newDocs['user'] = {
    status: 1,
    email: 'ben@riafox.com',
    companyIdentity: {
        name: newCompanyName,
        _id: ObjectId('533cd6ef03d943863961eb4c')
    },
    roleIds: [roleId],
    tagIds: [],
    profile: {
        firstName: 'Ben',
        lastName: 'Whitaker',
        phone: '2087942561',
        email: 'ben@riafox.com',
        timezone: 'America/Denver',
        _id: ObjectId('533f798e087eb5186672d698')
    },
    settings: {
        acceptedTerms: false,
        seenWelcomeModal: true,
        displayedTimezone: 'America/Denver'
    },
    companyId: newCompanyId,
    logins: [
        {
            type: '[LoginType] web',
            key: '$2a$12$QveqevC5fxtYz9E.HXS3YuEDLsxHRaWnKXFAogrVa3orBoUaCSRLi' // ria@12345
        }
    ]
};

newDocs['role'] = {
    _id: roleId,
    status: 1,
    name: 'Admin',
    permissions: [],
    settings: {
        canEdit: true,
        canDelete: true
    },
    companyId: newCompanyId,
    categories: null
};

const newCollections = ['user', 'company', 'role'];

newDb = db.getSiblingDB(newDatabase);
newDb.createCollection(tempCollectionName);
const tempCollection = newDb.getCollection(tempCollectionName);
print(db.getMongo().getDBNames());
if (
    db
        .getMongo()
        .getDBNames()
        .indexOf(newDatabase) !== -1
) {
    print('database exists');
    newCollections.forEach(col => {
        newDb.createCollection(col);
        let useCollection = newDb[col];
        useCollection.insert(newDocs[col]);
    });
} else {
    print('database was not created successfully');
}
tempCollection.drop();
