import Container from "@/components/container/Container";
import SignupForm from "@/components/signup-form/SignupForm";
import TaglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Buffs - Signup",
  description: TaglineMessages.default,
};

function SignupPage({}: Props) {
  return (
    <main>
      <Container>
        <SignupForm />
      </Container>
    </main>
  );
}

export default SignupPage;
