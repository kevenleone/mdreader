import { Provider, createStore } from 'jotai';
import { Suspense, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { articleSlugAtom } from '../../../store/articles.atom';

const previewStore = createStore();

const PreviewOutlet = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      previewStore.set(articleSlugAtom, id);
    }
  }, [id]);

  return (
    <Suspense fallback="...">
      <Provider store={previewStore}>
        <Outlet />
      </Provider>
    </Suspense>
  );
};

export { PreviewOutlet };
