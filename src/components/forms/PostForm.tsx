import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "../ui/form";
  import { Textarea } from "../ui/textarea";
  import { Button } from "../ui/button";
  import {Input} from "../ui/input"
import FileUploader from "../ui/shared/FileUploader";
import { PostValidation } from "../../lib/validation/index";
import { useUserContext } from "../../context/AuthContext";
import { toast } from "../ui/use-toast";
import { useCreatePost } from "../../lib/react-query/queriesAndMutations";

type PostFormProps={
    post?:Models.Document
}
const PostForm = ({post}:PostFormProps) => {
     // 1. Define your form.
     const {user}=useUserContext()
     const navigate=useNavigate()
  const {mutateAsync:createPost,isPending:isLoadingCreate}=useCreatePost()
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption:post?post?.caption:"",
      file:[],
      location:post?post?.location:"",
      tags:post?post.tags.join(','):''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
   const newPost=await createPost({
    ...values,
    userId:user.id
   })
   if(!newPost){
    toast({
        title:'Please try again'
    })
   }
   navigate('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">caption</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} className="shad-textarea custom-scrollbar"/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags
              (separated by comma ",")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Art,Expression,Learn" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
        <Button type="button" className="shad-button_dark_4">Cancel</Button>
        <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        </div>
      </form>
    </Form>
  )
};

export default PostForm;
