export interface Project {
  id: string
  title: string
  company: string
  dateStart: string
  dateEnd: string
  location?: string
  description: string
  imageUrls: string[]
  tags: string[]
  createdAt: string
}
