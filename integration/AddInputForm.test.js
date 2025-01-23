describe('AddInputForm', () => {
    it('Base example', async () => {
        await page.goto(`http://localhost:6006/iframe.html?args=&id=todolists-additemform--add-item-form-story-basic&viewMode=story`,
            { waitUntil: 'networkidle2'});
        const image = await page.screenshot();

        expect(image).toMatchSnapshot
    })
})