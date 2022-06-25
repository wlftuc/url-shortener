import React from "react";

import {
  useDisclosure,
  Button,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  DrawerHeader,
} from "@chakra-ui/react";

export default function DrawerLinks({ links }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <button
        onClick={onOpen}
        className="font-semibold border rounded-md p-2 max-w-2xl text-center text-sm"
      >
        Visit all your generated links
      </button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={"rgb(17,17,17)"}>
          <DrawerHeader borderBottomWidth="1px" fontSize={"small"}>
            All your shortened links can be found here
          </DrawerHeader>
          <DrawerBody>
            {links.map((index, key) => {
              return <div key={key}></div>;
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
