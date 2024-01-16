import axios from 'axios';

export const githubAPI = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
