async function imageUpload(req, res) {

    let imageUrl = null;

    // Check if a file is uploaded
    if (req.file) {
        const base64Image = req.file.buffer.toString('base64');
        const formData = new FormData();
        formData.append('image', base64Image);

        try {
            // Upload image to ImageBB
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            // Get the ImageBB URL
            imageUrl = response.data.data.url;
        } catch (uploadError) {
            console.error('Error uploading image to ImageBB:', uploadError);
            return res.status(500).json({ message: 'Error uploading image!' });
        }
    }
}

module.exports = { imageUpload };