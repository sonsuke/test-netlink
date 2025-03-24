# Giải thích khi nào nên và không nên sử dụng caching trong hệ thống backend.

## Use case nên dùng:

- Câu truy vấn tính toán phức tạp, data lớn có thể tái sử dụng
- Hệ thống có dữ liệu ít thay đổi, thao tác ghi vào db
- Ứng dụng yêu cầu thời gian phản hồi nhanh

## Usecase không nên dùng

- Dữ liệu ít hoặc truy vấn nhanh, dùng cache sẽ làm cho việc quản lý sẽ phức tạp hơn
- Data thay đổi nhiều thì việc caching sẽ gây ra sự thiếu chính xác về dữ liệu
- Dữ liệu nhạy cảm, cần bảo mật, cần cẩn trọng khi sử dụng cache để tránh lộ thông tin

# Database & Kiến trúc hệ thống

- Một hệ thống thương mại điện tử đang sử dụng PostgreSQL, nhưng khi số lượng
  đơn hàng tăng lên hàng triệu, các truy vấn trở nên chậm hơn

Yêu cầu:
Đề xuất các cách tối ưu cơ sở dữ liệu để cải thiện hiệu suất truy vấn.
Viết một truy vấn SQL tối ưu để lấy danh sách đơn hàng mới nhất của một
người dùng, bao gồm thông tin sản phẩm trong đơn hàng.

## Tối ưu cơ sở dữ liệu để cải thiện hiệu suất có thể có cách cách sau:

- Tạo index trên các trường thường xuyên dùng trong mệnh đề WHERE, JOIN, ORDER BY ( trừ một số cột như status vì đánh index trên cột này không hiệu quả), sử dụng index kết hợp (composite index) cho các cột thường xuất hiện cùng nhau

- Tạo partition, đối với bảng orders nhiều thì có thể chia thành nhiều bảng con theo một số tiêu chí về thời gian tạo như quý/tháng/năm :

```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);


Tạo partition cho bảng order với năm 2024


CREATE TABLE orders_2024 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');
```

- Caching các kết quả truy vấn phổ biến
- Nâng cấp phần cứng máy chủ (CPU, RAM, SSD)
- Sử dụng cơ chế replica để phân tán đọc, phân tách write/read

## Câu truy vấn lấy ra danh sách đơn hàng mới nhất:

```
SELECT
    od.order_id,
    od.order_date,
    product.product_id,
    product.product_name,
    od.quantity,
    od.price
FROM orders order
JOIN order_detail od ON od.order_id = order.order_id
JOIN products p ON od.product_id = product.product_id
WHERE order.user_id = ?
ORDER BY od.order_date DESC;
```
