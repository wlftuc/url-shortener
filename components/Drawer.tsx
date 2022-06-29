import React, { useState, useEffect } from "react";

// Next.js
import Link from "next/link";

// Chakra UI & Icons
import {
  useDisclosure,
  Button,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";

import { LocalLinkHistory } from "../lib/types";

// components
import BorderButton from "./BorderButton";

// MISC
import { LocalFunctions } from "../lib/storage";

export default function DrawerLinks(props) {
  //states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);
  const [revealPassword, setRevealPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [lReveal, setLReveal] = useState([]);

  useEffect(() => {
    setLReveal(
      Array.from(JSON.parse(localStorage.getItem("links") || "[]")).map(
        //@ts-expect-error
        (obj) => ({ ...obj, reveal: false })
      )
    );
  }, [onOpen]);

  // misc
  const local = new LocalFunctions(setLinks);

  function clearAndReFetch() {
    local.clearLocalStorage();
    local.fetchFromLocalStorage();
  }

  function updateStateAtIndex(index: number) {
    const newArr = [...lReveal];
    newArr[index].reveal = !newArr[index]?.reveal;

    setLReveal(newArr);
  }

  return (
    <div>
      <button
        onClick={() => local.openAndFetch(onOpen)}
        className="font-semibold border rounded-md p-2 max-w-2xl text-center text-sm"
      >
        {props.label}
      </button>
      <Drawer
        size={props.size}
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={colorMode == "dark" ? "rgb(17,17,17)" : "white"}
        >
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px" fontSize={"small"}>
            {props.children}
          </DrawerHeader>
          <DrawerBody>
            {links.length ? (
              <div>
                <Button
                  className="mb-2"
                  colorScheme={colorMode == "dark" ? "pink" : "red"}
                  onClick={clearAndReFetch}
                  size="sm"
                >
                  Delete all links
                </Button>
              </div>
            ) : (
              ""
            )}
            {links.length ? (
              links.map((index: LocalLinkHistory, i: number) => {
                const localReveal = lReveal[i]?.reveal;
                const metaPasswordRevealText = localReveal
                  ? "Hide Password"
                  : "Reveal Password";
                const PasswordRevealComponent = localReveal
                  ? EyeOffIcon
                  : EyeIcon;
                return (
                  <div className="my-2 text-sm" key={i}>
                    <div className="mb-4 rounded-md  border p-2">
                      <p>
                        <span className="font-bold">Link: </span>

                        <Link href={index.slug}>
                          <a>{index.link}</a>
                        </Link>
                      </p>

                      <div>
                        <span className="font-bold ">Password: </span>
                        <input
                          type={localReveal ? "text" : "password"}
                          readOnly
                          className={`px-1 rounded-sm bg-transparent ${
                            !index.password.length && localReveal
                              ? colorMode == "dark"
                                ? "text-red-200"
                                : "text-red-500"
                              : ""
                          }`}
                          value={index.password || "Unprotected link"}
                        />
                        <span className="text-center mx-2 lg:mx-8 mt-2  space-x-2">
                          <BorderButton
                            aria-label={metaPasswordRevealText}
                            name={metaPasswordRevealText}
                            onClick={() => updateStateAtIndex(i)}
                          >
                            <PasswordRevealComponent className="h-4 mt w-4 cursor-pointer" />
                          </BorderButton>

                          <BorderButton
                            aria-label={metaPasswordRevealText}
                            name={metaPasswordRevealText}
                            className="p-2 rounded-md bg-red-300"
                            onClick={() => local.deleteLinkAtSlug(i)}
                          >
                            <Tooltip placement="top" label="delete link">
                              <TrashIcon className="h-4 w-4" />
                            </Tooltip>
                          </BorderButton>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-screen max-h-80 items-center justify-center">
                <h1 className="mt-2 text-2xl font-bold text-center">
                  You haven't shortened any links!
                </h1>
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
