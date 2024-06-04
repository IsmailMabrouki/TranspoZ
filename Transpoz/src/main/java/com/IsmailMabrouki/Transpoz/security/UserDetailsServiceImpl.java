package com.IsmailMabrouki.Transpoz.security;


import com.IsmailMabrouki.Transpoz.authUsers.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository repository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


    @Transactional
    public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}