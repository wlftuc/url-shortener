import React from "react";

import { prisma } from "../lib/prisma";
import { Hash } from "../lib/secure/secure";

export default function Slug() {
  return <div>Slug</div>;
}

/**
 *
 * @TODO - Add some level of string matching.
 * If a slug/url does not exist, return the slug/url which closely matches to the original input
 *
 * Quite redundant, but could teach you a lot of stuff.
 */

export const getServerSideProps = async (context: {
  params: { slug: string };
}) => {
  const currentSlug: string = context.params.slug;
  const hash = new Hash(process.env.API_ROUTE_TOKEN)

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
      destination: hash.decrypt(redirectTo.redirectTo),
    },
  };
};
