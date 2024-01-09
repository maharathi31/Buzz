import {Client,Account,Databases,Storage,Avatars} from "appwrite"

export const appwriteConfig={
    projectId:'658e792a645225cd2a8e',
    url: 'https://cloud.appwrite.io/v1',
    databaseId:'659c31ad5b6755357052',
    storageId:'http://127.0.0.1:5173/',
    userCollectionId:'659c328d69f7f9104b32',
    postCollectionId:'659c321586a8fcb87805',
    savesCollectionId:'659c32bac54918d00d7a'
}

export const client=new Client()
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account=new Account(client)
export const databases=new Databases(client)
export const storage=new Storage(client)
export const avatars=new Avatars(client)