package com.IsmailMabrouki.Transpoz.authUsers;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    void deleteByUserId(Long userId);

    Optional<Token> findByToken(String token);
}