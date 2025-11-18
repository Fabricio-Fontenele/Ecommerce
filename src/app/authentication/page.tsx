import Header from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signUpForm";
const AuthenticationPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-md px-4 py-8 sm:px-6 sm:py-12">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in" className="text-sm sm:text-base">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="sign-up" className="text-sm sm:text-base">
                Criar Conta
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="mt-6 w-full">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up" className="mt-6 w-full">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationPage;
