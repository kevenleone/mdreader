# MD Reader

> Effortlessly organize your favorite Markdown into 'Articles' that are both easy to manage and share with others. Say goodbye to cluttered notes and hello to a sleek, streamlined system that puts your ideas front and center.

## Description

Save and organize your favorites markdown files in a single storage and share with friends.

The application was designed to be Client Side (Vite) and leverage Supabase for Auth and Storage, still considering to move to SSR approach.

## :zap: Installation and Instructions

- Install the packages `yarn`

#### Folder Structure

- apps/mdreader
  - Main application using Vite
- packages/md
  - Component Library responsible for rendering Articles `(.md files)`
  - Renderer made with rehype and remark libraries.
- packages/ui
  - Reusable Components provided by [shadcn/ui](https://github.com/shadcn/ui).

```
apps/mdreader
packages/md
packages/ui
```

## Motivation

Organizing content and favorites is a difficult job, especially when they are markdown files mirrored in random repositories, as I have the habit of searching documents on Github, many of them focused on good practices and usage guides the favorite button and selecting by topics becomes a little harder.

The aim of the project is to centralize these valuable documents and save them to your profile, you can create articles and folders for organization and the project nicely displays the markdown content.

## :handshake: **Contributing**

If you liked the project and want to cooperate feel free to fork this repository and send Pull Requests.

All kinds of contributions are very welcome and appreciated

- ⭐️ Star the project
- 🐛 Find and report issues
- 📥 Submit PRs to help solve issues or add features

## :book: License

MIT license, Copyright (c) 2023 Keven Leone.
