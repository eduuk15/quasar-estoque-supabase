import { formatCurrency } from 'src/utils/format'

const columnsProduct = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'img_url', align: 'left', label: 'Img', field: 'img_url', sortable: false },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', align: 'right', label: 'Action', field: 'actions', sortable: false }
]

export {
  columnsProduct
}
