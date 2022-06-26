import React from "react";

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
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

export default function DrawerLinks(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);
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
    localStorage.setItem("links", []);
    fetchFromLocalStorage();
  }


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
              <Button
                className="mb-2"
                colorScheme={colorMode == "dark" ? "pink" : "red"}
                onClick={clearLocalStorage}
                size="sm"
              >
                Delete all links
              </Button>
            ) : (
              ""
            )}
            {links.length ? (
              links.map((index, key) => {
                return (
                  <div className="my-2 text-sm">
                    <div className="mb-4 rounded-md border p-2">
                      <p>
                        <span className="font-bold">Link: </span>
                        <Link href={index.slug}>
                          <a>{index.link}</a>
                        </Link>
                      </p>
                      <p className="font-bold">
                        <span className="font-bold">Password: </span>
                        {!index.password.length ||
                        index.password == "Not password protected" ? (
                          <span
                            className={
                              colorMode == "dark"
                                ? "text-red-200"
                                : "text-red-500"
                            }
                          >
                            Unprotected link
                          </span>
                        ) : (
                          index.password
                        )}
                      </p>
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
