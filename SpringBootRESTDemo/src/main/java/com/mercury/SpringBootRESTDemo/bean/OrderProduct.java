package com.mercury.SpringBootRESTDemo.bean;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "msi_order_product")
public class OrderProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MSI_ORDER_PRODUCT_SEQ_GEN")
	@SequenceGenerator(name = "MSI_ORDER_PRODUCT_SEQ_GEN", sequenceName = "MSI_ORDER_PRODUCT_SEQ",allocationSize=1)
	private int id;
	@Column
	private int qty;
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinColumn(name = "order_id")
	@JsonIgnoreProperties("purchases")
	private Order order;
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinColumn(name = "product_id")
	private Product product;

	public OrderProduct() {
		super();
	}

	public OrderProduct(int qty, Order order, Product product) {
		super();
		this.qty = qty;
		this.order = order;
		this.product = product;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	@Override
	public String toString() {
		return "OrderProduct [id=" + id + ", qty=" + qty + ", product=" + product + "]";
	}

	@Override
	public boolean equals(Object obj) {
		OrderProduct op =  (OrderProduct)obj;
		return op.getProduct().getId() == product.getId() && op.getOrder().getId() == order.getId();
	}
	
}
