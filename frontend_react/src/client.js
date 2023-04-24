// sanity 客户端

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const client = createClient({
  projectId: "3mffywtp",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-04-21",
  token: process.env.REACT_APP_SANITY_TOKEN
})

// 获取后端图片相关是 api
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
