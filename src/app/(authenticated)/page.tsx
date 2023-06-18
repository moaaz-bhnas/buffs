import Container from "@/components/container/Container";
import AddReviewContainer from "@/components/add-review/AddReviewContainer";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buffs - Feed",
  description: taglineMessages.default,
};

export default function Home() {
  return (
    <main>
      {/* <Motion /> */}
      <Container>
        <div className="flex">
          <div className="w-full sm:w-3/5">
            {/* @ts-expect-error Async Server Component */}
            <AddReviewContainer />
          </div>
        </div>
      </Container>
    </main>
  );
}
