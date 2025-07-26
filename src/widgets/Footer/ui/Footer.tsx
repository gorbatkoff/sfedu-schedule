import { memo } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";

import styles from "./Footer.module.scss";

const repositoryUrl = `https://github.com/gorbatkoff/sfedu-schedule`;

export const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <Heading as="h5" size="md" colorScheme="yellow" color="gray.500">
        Сделано с любовью 💚
      </Heading>
      <a href={repositoryUrl}>
        <Heading size="md" as="h6">
          GitHub
        </Heading>
        <ExternalLinkIcon boxSize={5} />
      </a>
    </footer>
  );
});
