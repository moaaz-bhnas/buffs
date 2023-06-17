"use client";

import { ServerApiClient } from "@/apis/server-api-client";
import { SigninRequest } from "@/interfaces/server/SigninRequest";
import TaglineMessages from "@/utils/messages/taglineMessages";
import { BaseSyntheticEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAsyncFn } from "react-use";
import InlineInput from "../inline-input/InlineInput";
import emailValidationRegex from "@/utils/regex/emailValidationRegex";
import ThemeButton from "../theme-button/ThemeButton";
import ErrorMessages from "@/utils/messages/errorMessages";

type Props = {};

type TOnSubmit = (
  data: SigninRequest,
  event: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

const serverApiClient = new ServerApiClient();

function SigninForm({}: Props) {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<SigninRequest>();
  const watcher = useWatch({ control });

  const [onSubmitState, onSubmit] = useAsyncFn<TOnSubmit>(async (data) => {
    const result = await serverApiClient.signin(data);
    if (result.isErr()) {
      throw new Error(result.error.errorMessage);
    }
  });

  return (
    <form
      className="space-y-8 sm:mx-auto sm:max-w-md sm:p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="space-y-1.5">
        <h2 className="title-1">Popcorn&apos;`s ready - welcome back!</h2>
        <p className="text-gray-500">{TaglineMessages.default}</p>
      </header>

      <div className="space-y-3">
        <InlineInput
          value={watcher.email || ""}
          type="email"
          classname="rounded-md p-2"
          label="Email address"
          labelClassName="text-gray-500"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailValidationRegex,
              message: "Please enter a valid email",
            },
            validate: {
              emailExists: async (fieldValue) => {
                const result = await serverApiClient.getUserByEmail(fieldValue);
                if (result.isErr()) {
                  return "Sorry, email does not exist.";
                }
                return true;
              },
            },
          })}
          error={errors.email}
        />
        <InlineInput
          value={watcher.password || ""}
          type="password"
          classname="rounded-md p-2"
          label="Password"
          labelClassName="text-gray-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password}
        />
      </div>

      <ThemeButton
        type="submit"
        className="w-full"
        loading={isSubmitting}
        disabled={!isValid}
        error={onSubmitState.error && ErrorMessages.somthingWentWrong}
      >
        Login
      </ThemeButton>
    </form>
  );
}

export default SigninForm;