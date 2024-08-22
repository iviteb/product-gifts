import { GIFTS_ADDITIONALINFO_KEY } from './constants'

export function getCurrentItemHighLightedGifts(
  data: AdditionalInfoQueryResponse | undefined,
  productId: string | undefined,
  selectedItemId: string | undefined
): string[] {
  if (!data || !data.products?.length || !productId || !selectedItemId) {
    return []
  }
  // We get the current sku highlights additional info
  const selectedItemFromProductQuery = data.products
    .find(product => product.productId === productId)
    ?.items.find(item => item.itemId === selectedItemId)

  let highlightedGiftsIds: string[] = []

  for (const seller of selectedItemFromProductQuery?.sellers ?? []) {
    for (const discountHighlight of seller?.commertialOffer
      ?.discountHighlights) {
      const giftAdditionalInfo = discountHighlight?.additionalInfo?.find(
        info => info.key === GIFTS_ADDITIONALINFO_KEY
      )
      if (giftAdditionalInfo?.value) {
        const ids = giftAdditionalInfo.value
          .split(',')
          .map((id: string) => id.trim())
          .filter((id: string) => id)
        highlightedGiftsIds = [...highlightedGiftsIds, ...ids]
      }
    }
  }

  return highlightedGiftsIds
}
