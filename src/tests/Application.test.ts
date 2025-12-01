import reducer, {
  initialState,
  setShowAppLoader,
} from '@redux/slices/Application';

test('', () => {
  expect(reducer(initialState, setShowAppLoader(true))).toMatchObject({
    showAppLoader: true,
  });
});
