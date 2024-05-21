import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";

import styles from "./Footer.module.scss";

const repositoryUrl = `https://github.com/gorbatkoff/sfedu-schedule`;

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Heading as="h5" size="md" colorScheme="yellow" color="gray.500">
        Сделано с любовью 💚
      </Heading>
      <a href={repositoryUrl}>
        <Heading size="md" as="h6" color="gray.500">
          GitHub
        </Heading>
        <ExternalLinkIcon color="gray.500" boxSize={5} />
      </a>
    </footer>
  );
};
