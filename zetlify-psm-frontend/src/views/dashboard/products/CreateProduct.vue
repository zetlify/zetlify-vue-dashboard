<script setup>
import Heading from '@/components/Heading.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import { Form, Field } from 'vee-validate'
</script>

<template>
  <Heading title="Create Product" />
  <Card class="mb-6">
    <Form v-slot="{ isSubmitting }" autocomplete="off">
      <!-- Company -->
      <div class="mb-4">
        <label for="company" class="input-label">Company</label>
        <Field name="company_id" as="select" id="company" class="input">
          <option value="1">Company One</option>
          <option value="2">Company Two</option>
          <option value="3">Company Three</option>
        </Field>
        <span class="input-error"></span>
      </div>
      <!-- Categories -->
      <div class="mb-4">
        <label for="category" class="input-label">Category</label>
        <Field name="category_id" as="select" id="category" class="input">
          <option value="1">Category One</option>
          <option value="2">Category Two</option>
          <option value="3">Category Three</option>
        </Field>
        <span class="input-error"></span>
      </div>
      <!-- Name -->
      <div class="mb-4">
        <label for="name" class="input-label">Product Name</label>
        <Field name="name" type="text" id="name" placeholder="Name" class="input" />
        <span class="input-error"></span>
      </div>
      <!-- Description -->
      <div class="mb-4">
        <label for="description" class="input-label">Product Description</label>
        <Field
          name="description"
          type="text"
          id="description"
          placeholder="Description"
          class="input"
        />
        <span class="input-error"></span>
      </div>
      <!-- Price -->
      <div class="mb-4">
        <label for="price" class="input-label">Product Price</label>
        <Field name="price" type="number" id="price" placeholder="Price $$" class="input" />
        <span class="input-error"></span>
      </div>
      <!-- Quantity -->
      <div class="mb-4">
        <label for="quantity" class="input-label">Product Quantity</label>
        <Field name="quantity" type="number" id="quantity" placeholder="Quantity" class="input" />
        <span class="input-error"></span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Manufactured Date -->
        <div class="mb-4">
          <label for="manufactured_at" class="input-label">Manufactured Date</label>
          <Field name="manufactured_at" type="date" id="manufactured_at" class="input" />
          <span class="input-error"></span>
        </div>
        <!-- Expired Date -->
        <div class="mb-4">
          <label for="expired_at" class="input-label">Expire Date</label>
          <Field name="expired_at" type="date" id="expired_at" class="input" />
          <span class="input-error"></span>
        </div>
        <!-- Barcode Type -->
        <div class="mb-4">
          <label for="barcode_type" class="input-label">Barcode Type</label>
          <Field name="barcode_type" as="select" id="barcode_type" class="input">
            <option value="1">Barcode One</option>
            <option value="2">Barcode Two</option>
            <option value="3">Barcode Three</option>
          </Field>
          <span class="input-error"></span>
        </div>
      </div>
      <Button intent="primary" size="big" :loading="isSubmitting">Add Product</Button>
    </Form>
  </Card>
</template>
