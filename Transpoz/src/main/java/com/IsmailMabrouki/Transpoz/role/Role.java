package com.IsmailMabrouki.Transpoz.role;

import com.IsmailMabrouki.Transpoz.authUsers.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "role")
@EntityListeners(AuditingEntityListener.class)
public class Role {

    @Id
    @GeneratedValue
    private Integer id;

    @Setter
    @Enumerated(EnumType.STRING)
    private UserRole name; // Use String to represent role type

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<User> users;

//    private Set<Permission> permissions; // Permissions assoc

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

//    public List<SimpleGrantedAuthority> getAuthorities() {
//        var authorities = getPermissions()
//                .stream()
//                .map(permission -> new SimpleGrantedAuthority(permission.name()))
//                .collect(Collectors.toList());
//        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name));
//    return authorities;
//    }
}
