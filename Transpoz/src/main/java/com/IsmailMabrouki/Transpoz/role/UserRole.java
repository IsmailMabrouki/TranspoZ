package com.IsmailMabrouki.Transpoz.role;

import com.IsmailMabrouki.Transpoz.authUsers.Permission;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.IsmailMabrouki.Transpoz.authUsers.Permission.*;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    USER(Set.of(
            USER_READ,
            USER_UPDATE,
            USER_CREATE,
            USER_DELETE
    )),
    ADMIN(Set.of(
            ADMIN_READ,
            ADMIN_UPDATE,
            ADMIN_CREATE,
            ADMIN_DELETE
    )),
    DRIVER(Set.of(
            DRIVER_READ,
            DRIVER_UPDATE,
            DRIVER_CREATE,
            DRIVER_DELETE
    ));

    private final Set<Permission> permissions;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        final List<SimpleGrantedAuthority> grantedAuthorities = this.permissions
                .stream().map(
                        permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return grantedAuthorities;
    }
}
