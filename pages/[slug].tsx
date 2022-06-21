import React from "react";

import { prisma } from "../lib/prisma";

export default function Slug() {
  return <div>Slug</div>;
}

export const getServerSideProps = async (context) => {
  const currentSlug: string = context.params.slug;

  const redirectTo = await prisma.shortener.findUnique({
    where: {
      slug: currentSlug,
    },
  });

  if (!redirectTo) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  return {
    redirect: {
      destination: redirectTo.redirectTo,
    },
  };
};
