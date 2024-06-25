const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    require_error: 'Movie title is required. Please, check url'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string().min(1),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Comedy',
      'Drama',
      'Hhorror',
      'Sci-fi',
      'Thriller',
      'Adventure',
      'Fantasy',
      'Crime'
    ]),
    {
      invalid_type_error: 'Genre must be an array of strings',
      require_error: 'Genre is required. Please, check url'
    }
  )
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
