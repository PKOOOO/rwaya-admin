// app/post-sign-in/page.tsx
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

export default async function PostSignIn() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/') // Shouldn't happen but good to handle
  }

  const store = await prismadb.store.findFirst({
    where: { userId }
  })

  if (store) {
    redirect(`/${store.id}`)
  }

  // If no store exists (first-time user)
  redirect('/onboarding') // Or wherever you want new users to go
}