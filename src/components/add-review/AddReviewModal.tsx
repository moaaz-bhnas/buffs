"use client";

import getFirstWord from "@/utils/string/getFirstWord";
import { Dialog, Transition } from "@headlessui/react";
import { Session } from "next-auth";
import { Fragment, useState } from "react";
import AddReviewForm from "./AddReviewForm";

type Props = {
  user: Session["user"];
};

function AddReviewModal({ user }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="h-full w-full rounded-2xl bg-gray-200 px-4 text-start text-gray-500"
      >
        Want to review a movie, {user?.name ? getFirstWord(user.name) : ""}?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <AddReviewForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddReviewModal;