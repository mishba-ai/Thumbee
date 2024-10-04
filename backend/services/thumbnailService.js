// import axios from 'axios';
// import FormData from 'form-data';

// const generateThumbnail = async (title, description) => {
//   console.log("Generating thumbnail for:", { title, description });

//   try {
//     console.log("API Key:", process.env.STABILITY_API_KEY ? "Set" : "Not set");

//     const formData = new FormData();
//     formData.append('text_prompts[0][text]', `Create a thumbnail image for a video titled "${title}". ${description}`);
//     formData.append('cfg_scale', '7');
//     formData.append('clip_guidance_preset', 'FAST_BLUE');
//     formData.append('height', '720');
//     formData.append('width', '1280');
//     formData.append('samples', '1');
//     formData.append('steps', '30');

//     const response = await axios.post(
//       'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image',
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//           Accept: 'application/json',
//           Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       const base64Image = response.data.artifacts[0].base64;
//       return `data:image/png;base64,${base64Image}`;
//     } else {
//       throw new Error(`API returned status code ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Error in generateThumbnail:", error);

//     if (error.response) {
//       console.error("API response:", error.response.data);
//     }
//     throw new Error("Failed to generate thumbnail: " + (error.message || "Unknown error"));
//   }
// };

// export { generateThumbnail };
import axios from 'axios';

const generateThumbnail = async (title, description) => {
  console.log('Generating thumbnail for:', { title, description });
  try {
    console.log('API Key:', process.env.STABILITY_API_KEY ? 'Set' : 'Not set');
    
    const response = await axios.post(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        text_prompts: [
          {
            text: `Create a thumbnail image for a video titled "${title}". ${description}`
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 50,
        
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
      }
    );

    console.log('Image generated successfully');
    const base64Image = response.data.artifacts[0].base64;
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Error in generateThumbnail:', error.response ? error.response.data : error.message);
    throw new Error(`Failed to generate thumbnail: ${error.message}`);
  }
};

export { generateThumbnail };