import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Product, Sku } from '@/types/schema'

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSkuOpen, setIsSkuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    sku: '',
    stockQuantity: 0
  })
  const [newSku, setNewSku] = useState<Partial<Sku>>({
    productId: 0,
    sku: '',
    stockQuantity: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`)
      }
      
      const result = await response.json()
      alert('Product added successfully!')
      setIsOpen(false)
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: '',
        sku: '',
        stockQuantity: 0
      })
    } catch (error) {
      console.error('Error adding product:', error)
      alert(error instanceof Error ? error.message : 'Failed to add product')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stockQuantity' ? Number(value) : value
    }))
  }

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSku(prev => ({
      ...prev,
      [name]: name === 'stockQuantity' || name === 'productId' ? Number(value) : value
    }))
  }

  const handleSkuSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/skus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSku),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to add SKU: ${response.statusText}`)
      }
      
      // Check content type before parsing JSON
      const contentType = response.headers.get("content-type")
      let result
      if (contentType && contentType.includes("application/json")) {
        result = await response.json()
      } else {
        // Handle non-JSON response
        const text = await response.text()
        console.log("Non-JSON response:", text)
        result = { message: "SKU added successfully" }
      }
      
      alert('SKU added successfully!')
      setIsSkuOpen(false)
      // Reset form
      setNewSku({
        productId: 0,
        sku: '',
        stockQuantity: 0
      })
    } catch (error) {
      console.error('Error adding SKU:', error)
      alert(error instanceof Error ? error.message : 'Failed to add SKU')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <p>Welcome to the admin dashboard</p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Add Product</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={newProduct.imageUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={newProduct.category}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={newProduct.sku}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      value={newProduct.stockQuantity}
                      onChange={handleChange}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Product'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isSkuOpen} onOpenChange={setIsSkuOpen}>
              <DialogTrigger asChild>
                <Button>Add SKU</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New SKU</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSkuSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="productId">Product ID</Label>
                    <Input
                      id="productId"
                      name="productId"
                      type="number"
                      value={newSku.productId}
                      onChange={handleSkuChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sku">SKU Code</Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={newSku.sku}
                      onChange={handleSkuChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      value={newSku.stockQuantity}
                      onChange={handleSkuChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    onClick={() => {
                      console.log('SKU data being submitted:', newSku);
                    }}
                  >
                    {isLoading ? 'Saving...' : 'Save SKU'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin
