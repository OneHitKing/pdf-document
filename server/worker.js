import { Job, Worker } from 'bullmq'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { QdrantVectorStore } from '@langchain/qdrant'
import { Document } from '@langchain/core/documents'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { CharacterTextSplitter } from '@langchain/textsplitters'

const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log(job.data)
    const data = JSON.parse(job.data)

    /*
        path : data.path
        read the pdf from path
        chunk the pdf
        call the embedding model for every chunk
        store the chunk in qdrant db
        */

    //Load the pdf
    const loader = new PDFLoader(data.path)
    const docs = await loader.load({})

    const client = new QdrantClient({ url: `https://localhost:6333` })
    const embeddings = new VertexAIEmbeddings({
      model: 'text-embedding-004',
    })
  },
  {
    concurrency: 100,
    connection: {
      host: 'localhost',
      port: 6379,
    },
  }
)
