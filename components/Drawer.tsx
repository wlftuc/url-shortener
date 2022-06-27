import React, { useState } from "react";

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

export default function DrawerLinks(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);
  const [revealPassword, setRevealPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  function fetchFromLocalStorage() {
    const allLinks = JSON.parse(localStorage.getItem("links") || "[]");

    setLinks(allLinks);
  }

  function openAndFetch() {
    fetchFromLocalStorage();
    onOpen();
  }

  function clearLocalStorage() {
    localStorage.setItem("links", JSON.stringify([]));
    fetchFromLocalStorage();
  }

  function deleteLinkAtSlug(i: number) {
    const lc = JSON.parse(localStorage.getItem("links") || "[]");
    const t = lc.splice(i, 1);
    localStorage.setItem("links", JSON.stringify(lc));
    fetchFromLocalStorage();
  }

  function revealIndividualLink(i: number) {
    console.log(i);
  }

  const PasswordRevealComponent = revealPassword ? EyeOffIcon : EyeIcon;
  const metaPasswordRevealText = revealPassword
    ? "Hide Password"
    : "Reveal Password";

  return (
    <div>
      <button
        onClick={openAndFetch}
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
                  onClick={clearLocalStorage}
                  size="sm"
                >
                  Delete all links
                </Button>

                <Button
                  size="sm"
                  onClick={() => setRevealPassword(!revealPassword)}
                  className={`mx-2 mb-2 ${
                    colorMode == "dark"
                      ? "text-white bg-white"
                      : "text-black bg-black"
                  }`}
                  name={metaPasswordRevealText}
                >
                  {metaPasswordRevealText + "s"}
                </Button>
              </div>
            ) : (
              ""
            )}
            {links.length ? (
              links.map((index: LocalLinkHistory, i: number) => {
                return (
                  <div className="my-2 text-sm" key={i}>
                    <div className="mb-4 rounded-md border p-2">
                      <p>
                        <span className="font-bold">Link: </span>
                        <Link href={index.slug}>
                          <a>{index.link}</a>
                        </Link>
                      </p>
                      <div>
                        <span className="font-bold">Password: </span>
                        <input
                          type={revealPassword ? "text" : "password"}
                          readOnly
                          className={`px-1 rounded-sm bg-transparent ${
                            !index.password.length && revealPassword
                              ? colorMode == "dark"
                                ? "text-red-200"
                                : "text-red-500"
                              : ""
                          }`}
                          value={index.password || "Unprotected link"}
                        />
                        <div className="float-right space-x-2">
                          <button
                            disabled
                            onClick={() => revealIndividualLink(i)}
                          >
                            <Tooltip placement="top" label="soon :)">
                              <PasswordRevealComponent className="h-5 w-5" />
                            </Tooltip>
                          </button>

                          <button onClick={() => deleteLinkAtSlug(i)}>
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
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
