"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      showToast("올바른 이메일 주소를 입력해 주세요.", "error");
      return;
    }
    setSubmitted(true);
    showToast("구독 신청이 완료되었습니다.");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소를 입력하세요"
        className="w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        {submitted ? "구독중" : "구독하기"}
      </button>
    </form>
  );
}
