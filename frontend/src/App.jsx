


function App() {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center text-white">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-2">Thumbnail Crafter</h1>
          <p className="text-xl">AI-Powered YouTube Thumbnail Generator</p>
        </header>
        
        <main className="text-center">
          <p className="mb-8 text-lg max-w-2xl">
            Create stunning YouTube thumbnails in seconds with the power of AI. 
            Upload your video details, and let our advanced algorithms do the rest!
          </p>
          
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
            Get Started
          </button>
        </main>
        
        <footer className="mt-16 text-sm opacity-75">
        <p>© 2024 Thumbnail Crafter. All rights reserved.</p>
      </footer>
      </div>
    </>
  )
}

export default App
