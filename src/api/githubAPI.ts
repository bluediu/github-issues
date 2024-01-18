import axios from 'axios';

export const githubAPI = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
