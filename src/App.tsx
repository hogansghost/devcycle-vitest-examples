function App() {
  return (
    <>
      <div>
        <p>Please look at the files for the testing examples</p>
        <p>
          RenderIfDevCycleInitialised function
          <br />
          <br />
          We await this with the children | null rendering as there seems to be
          an issue with the tests rendering the components before the provider
          is initialised, meaning that we do not get the expected output. This
          is, to say the least, not ideal and seeingly, trying to just await for
          elements does not work. Initial speculation is that it does not
          trigger a rerender when the provider initialises so the tests won't
          update and show the expected content based on the mock network
          requests.
        </p>
      </div>
    </>
  );
}

export default App;
