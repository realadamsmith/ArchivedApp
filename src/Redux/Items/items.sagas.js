import { auth, firestore } from "./../../Firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setProducts, setProduct, fetchProductsStart, setSellerProducts, setSellerProduct, setReferral } from "./items.actions";
import {
    handleAddProduct,
    handleFetchProducts,
    handleFetchSellerProducts,
    handleFetchProduct,
    handleDeleteProduct,
} from "./items.helpers";
import productsTypes from "./items.types";


export function* referralProduct({ payload }) {
  yield put(setReferral(payload));
  console.log(payload)
}
export function* onAddReferralStart() {
  yield takeLatest(productsTypes.REFERRAL_PRODUCT, referralProduct);
}

export function* addProduct({ payload }) {
    try {
        const timestamp = new Date();
        yield handleAddProduct({
            ...payload,
            createdDate: timestamp,
        });
        yield put(
            fetchProductsStart()
        );
    } catch (err) {
    }
}
export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
    try {

        const products = yield handleFetchProducts(payload);
        yield put(
            setProducts(products)
        );

    } catch (err) {
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}


// ░██████╗███████╗██╗░░░░░██╗░░░░░███████╗██████╗░  ██████╗░██████╗░░█████╗░██████╗░██╗░░░██╗░█████╗░████████╗░██████╗
// ██╔════╝██╔════╝██║░░░░░██║░░░░░██╔════╝██╔══██╗  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝██╔════╝
// ╚█████╗░█████╗░░██║░░░░░██║░░░░░█████╗░░██████╔╝  ██████╔╝██████╔╝██║░░██║██║░░██║██║░░░██║██║░░╚═╝░░░██║░░░╚█████╗░
// ░╚═══██╗██╔══╝░░██║░░░░░██║░░░░░██╔══╝░░██╔══██╗  ██╔═══╝░██╔══██╗██║░░██║██║░░██║██║░░░██║██║░░██╗░░░██║░░░░╚═══██╗
// ██████╔╝███████╗███████╗███████╗███████╗██║░░██║  ██║░░░░░██║░░██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝░░░██║░░░██████╔╝
// ╚═════╝░╚══════╝╚══════╝╚══════╝╚══════╝╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚═════╝░░╚════╝░░░░╚═╝░░░╚═════╝░



export function* fetchSellerProducts({payload}) {
    try {

        const sellerProducts = yield handleFetchSellerProducts(payload);
        yield put(
            setSellerProducts(sellerProducts)
        );

    } catch (err) {
        console.log(err);
    }
}

export function* onFetchSellerProductsStart() {
    yield takeLatest(productsTypes.FETCH_SELLER_PRODUCTS_START, fetchSellerProducts);
}




export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(fetchProductsStart());
    } catch (err) {
    }
}
export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(setProduct(product));
    } catch (err) {
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}
export default function* productsSagas() {
    yield all([
        call(onAddReferralStart),
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onFetchSellerProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
    ]);
}
