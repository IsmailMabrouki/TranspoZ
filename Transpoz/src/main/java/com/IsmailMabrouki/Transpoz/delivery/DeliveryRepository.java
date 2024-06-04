package com.IsmailMabrouki.Transpoz.delivery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    // You can add additional custom finder methods here
    //  (e.g., search by customer name, delivery status, etc.)
    List<Delivery> findByCustomerName(String customerName);
    List<Delivery> findByStatus(DeliveryStatus status);

    List<Delivery> findByAssignedDriver_Id(Long driverId);

    List<Delivery> findByCustomerId(Long userId);
}
