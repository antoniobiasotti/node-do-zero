import { randomUUID } from "node:crypto"

export class DatabaseMemory {
     #videos = new Map()

     list(search) {
          return Array.from(this.#videos.entries()).map((videoArray) => {
               const id = videoArray[0]
               const data = videoArray[1]

               return {
                    id,
                    ...data,
               }
          })
          .filter(video => {
               if (search) {
                    return video.title.includes(search)
               }

               return true
          })
     }

     // Estruturas de Dados
     // Set - Parecido com o array, mas não aceita objetos duplicados
     // Map -

     create(video) {
          const videoId = randomUUID()
          // UUID - Unique Universal ID
          this.#videos.set(videoId, video)
     }

     update(id, video) {
          this.#videos.set(id, video)
     }

     delete(id) {
          this.#videos.delete(id)
     }
}