import { INewUser } from "../../types/index";
import { account } from "./config";
import{ID} from 'appwrite'
export async function createUserAccount(user:INewUser){
try{
    const newAccount= await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    )
} catch(error){
    return error
}
}