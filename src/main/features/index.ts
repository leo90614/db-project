import Afeatures from './a/index';
import Bfeatures from './b/index';
import isDBConnected from './isDBConnected';

export default { ...Afeatures, ...Bfeatures, isDBConnected };
