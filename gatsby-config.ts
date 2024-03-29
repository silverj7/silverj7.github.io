import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    siteMetadata: {
      title: `SEJ's portfolio`,
      author: `SEJ`,
      description: `personal portfolio`,
      siteUrl: `https://silverj7.github.io`,
    },
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': 'src/components',
          '@layout': 'src/layout',
          '@module': 'src/module',
          '@pages': 'src/pages',
          '@types': 'src/types',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    },
  ],
};

export default config;
