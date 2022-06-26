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
} from "@chakra-ui/react";
import { useState } from "react";

export default function DrawerLinks(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);

  function fetchFromLocalStorage() {
    const allLinks = JSON.parse(localStorage.getItem("links") || "[]");

    setLinks(allLinks);
  }

  function openAndFetch() {
    fetchFromLocalStorage();
    onOpen();
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
        <DrawerContent backgroundColor={"rgb(17,17,17)"}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontSize={"small"}>
            {props.children}
          </DrawerHeader>
          <DrawerBody>
            {links.map((index, key) => {
              console.log(index.link, index.password);
              return (
                <div className="my-2 text-sm">
                  <div className="mb-4 rounded-md border p-2">
                    <p>
                      <span className="font-bold">Link:</span> {index.link}
                    </p>
                    <p className="font-bold">
                      <span className="font-bold">Password: </span>
                      {!index.password.length ? <span className="text-red-200">Unprotected link</span>: index.password}
                    </p>
                  </div>
                </div>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
