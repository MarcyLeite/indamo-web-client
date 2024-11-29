describe('Mocha with React Three Fiber', () => {
	const cube = (
		<mesh>
			<boxGeometry />
			<meshStandardMaterial />
		</mesh>
	)
	it('Should render simple cube', async () => {
		await threeRenderer.create(cube)
	})
})
