import { promises as fs } from 'fs'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFrontMatter from 'markdown-it-front-matter'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import { resolve } from 'path'
import readingTime from 'reading-time'
import { Post } from '~/utils/types'

export async function getAllPostSlugs(): Promise<string[]> {
  const dirpath = resolve(`posts`)
  const result = await fs.readdir(dirpath)

  return result
}

export async function parseMarkDown(slug: string): Promise<Post> {
  const filepath = resolve(`posts/${slug}/index.md`)
  const content = await fs.readFile(filepath, 'utf-8')
  let frontMatter: Record<string, string> = {}

  const md = markdownIt({
    html: true,
  })
    .use(markdownItFrontMatter, (fm) => {
      const entries = fm.split('\n').map((value) => value.split(': '))
      frontMatter = Object.fromEntries(entries)
    })
    .use(markdownItLinkAttributes, {
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    })
    .use(markdownItAnchor, {
      permalink: false, // TODO
    })
    .use(require('markdown-it-highlightjs'))

  const body = md.render(content)
  const { text } = readingTime(body)

  return {
    body,
    date: frontMatter.date,
    description: frontMatter.description,
    readingTime: text,
    slug,
    title: frontMatter.title,
  }
}
