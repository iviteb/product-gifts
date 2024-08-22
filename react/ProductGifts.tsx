import React, { createContext, useContext, useMemo } from 'react'
import { defineMessages } from 'react-intl'
import { useQuery } from 'react-apollo'
import {
  useResponsiveValue,
  MaybeResponsiveInput,
} from 'vtex.responsive-values'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'

import ProductGiftsQuery from './graphql/product.graphql'
import AdditionalInfoQuery from './graphql/products.graphql'
import { getCurrentItemHighLightedGifts } from './utils/functions'

interface Props {
  maxVisibleItems?: MaybeResponsiveInput<number | 'showAll'>
}

interface State {
  gifts: Gift[]
  maxVisibleItems: number | 'showAll'
}

const GiftsStateContext = createContext<State>({
  gifts: [],
  maxVisibleItems: 0,
})

const CSS_HANDLES = ['productGiftsContainer'] as const

const ProductGifts: StoreFunctionComponent<Props> = ({
  children,
  maxVisibleItems = 'showAll',
}) => {
  const productContext: Maybe<ProductContextState> = useProduct()
  const handles = useCssHandles(CSS_HANDLES)
  const staticMaxVisibleItems = useResponsiveValue<number | 'showAll'>(
    maxVisibleItems
  )
  const productId = productContext?.product?.productId
  const selectedItemId = productContext?.selectedItem?.itemId

  const { data, loading, error } = useQuery<ProductGiftsQueryResponse>(
    ProductGiftsQuery,
    {
      variables: {
        identifier: { field: 'id', value: productId },
      },
      skip: productId == null,
    }
  )
  const {
    data: additionalInfoData,
    loading: additionalInfoLoading,
    error: additionalInfoError,
  } = useQuery<AdditionalInfoQueryResponse>(AdditionalInfoQuery, {
    variables: {
      skuId: selectedItemId,
    },
    skip: !selectedItemId,
  })

  const highlightedGiftsToShow = getCurrentItemHighLightedGifts(
    additionalInfoData,
    productId,
    selectedItemId
  )

  const selectedItemFromProductQuery = data?.product.items.find(
    item => item.itemId === selectedItemId
  )
  const sellers = selectedItemFromProductQuery?.sellers ?? []

  const gifts = sellers.reduce((acc: Gift[], curr) => {
    // The gifts object does not include the itemId, so we need to use the giftSkuIds to match the gifts with the highlightedGiftsToShow. We assume that the giftSkuIds and the gifts have the same order.
    let currentSellerGifts: Gift[] = []
    const currentSellerGiftIds = curr.commertialOffer.giftSkuIds ?? []

    if (highlightedGiftsToShow.length && curr.commertialOffer?.gifts?.length) {
      currentSellerGifts = curr.commertialOffer.gifts.filter((_gift, index) =>
        highlightedGiftsToShow.includes(currentSellerGiftIds[index])
      )
    }

    return acc.concat(currentSellerGifts)
  }, [])

  const state = useMemo(
    () => ({ gifts, maxVisibleItems: staticMaxVisibleItems }),
    [gifts, staticMaxVisibleItems]
  )

  if (!productContext) {
    console.error(
      'Could not find a ProductContext value. Make sure this component is being used inside a ProductContextProvider.'
    )
  }

  if (error || additionalInfoError) {
    console.error(error, additionalInfoError)
  }

  if (loading || additionalInfoLoading || state.gifts.length === 0) {
    return null
  }

  return (
    <GiftsStateContext.Provider value={state}>
      <div className={handles.productGiftsContainer}>{children}</div>
    </GiftsStateContext.Provider>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.product-gifts.title',
    defaultMessage: '',
  },
  description: {
    id: 'admin/editor.product-gifts.description',
    defaultMessage: '',
  },
  maxVisibleItems: {
    id: 'admin/editor.product-gifts.maxVisibleItems.title',
    defaultMessage: '',
  },
  maxVisibleItemsDescription: {
    id: 'admin/editor.product-gifts.maxVisibleItems.description',
    defaultMessage: '',
  },
})

ProductGifts.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    maxVisibleItems: {
      default: 'showAll',
      title: messages.maxVisibleItems.id,
      description: messages.maxVisibleItemsDescription.id,
      type: 'string',
    },
  },
}

export function useProductGiftsState() {
  const context = useContext(GiftsStateContext)
  if (context === undefined) {
    throw new Error(
      'useProductGiftsState must be used within a ProductGiftsContextProvider'
    )
  }
  return context
}

export default ProductGifts
